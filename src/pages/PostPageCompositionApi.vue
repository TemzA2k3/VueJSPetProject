<template>

  <div>
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Поиск..."
    />
    <div class="app__btns">
      <my-button
      >
        Создать пост
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
    </my-dialog>

    <post-list
        :posts="sortedAndSearchedPosts"
        v-if="!isPostsLoading"
    />

    <div v-else>Идет загрузка...</div>
  </div>

</template>


<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import MyInput from "@/components/UI/MyInput.vue";
import {usePosts} from "@/hooks/usePosts";
import useSearchedAndSortedPosts from "@/hooks/useSearchedAndSortedPosts";
import useSortedPosts from "@/hooks/useSortedPosts";

export default {
  components: {
    MyInput,
    MyButton,
    MyDialog,
    PostForm, PostList,
  },

  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: "title", name: "По названию"},
        {value: "body", name: "По содержимому"},
      ],
    }
  },
  setup(props) {
    const {posts, isPostsLoading, totalPages} = usePosts(10)
    const {sortedPosts, selectedSort} = useSortedPosts(posts)
    const {searchQuery, sortedAndSearchedPosts} = useSearchedAndSortedPosts(sortedPosts)

    return {
      posts,
      isPostsLoading,
      totalPages,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts
    }
  },
}
</script>


<style>
.app__btns{
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
.page__warpper{
  display: flex;
  margin-top: 15px;
}
.page{
  border: 1px solid black;
  padding: 10px;
}
.current-page{
  border: 2px solid teal;
}
</style>