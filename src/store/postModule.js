import axios from "axios";

export const postModule = {
    state: () => {
        return {
            posts: [],
            isPostsLoading: false,
            selectedSort: "",
            searchQuery: "",
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: "title", name: "По названию"},
                {value: "body", name: "По содержимому"},
            ],
        }
    },
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]));
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
        }

    },
    mutations: {
        setPosts(state, posts){
            state.posts = posts;
        },
        setLoading(state, bool){
            state.isPostsLoading = bool;
        },
        setPage(state, page){
            state.page = page;
        },
        setSelectedSort(state, selectedSort){
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state, searchQuery){
            state.searchQuery = searchQuery;
        },
        setTotalPages(state, totalPages){
            state.totalPages = totalPages;
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true)
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts?", {
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers["x-total-count"] / state.limit));
                commit('setPosts', response.data);
            } catch (e){
                alert("Ошибка")
            } finally {
                commit('setLoading', false)
            }
        },
        // changePage(pageNumber) {
        //   this.page = pageNumber;
        // }
        async loadMorePosts({state, commit}) {
            commit('setPage', state.page + 1);
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts?", {
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers["x-total-count"] / state.limit));
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (e){
                alert("Ошибка")
            }
        },
    },
    namespaced: true,
}