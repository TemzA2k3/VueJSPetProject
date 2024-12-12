import {createStore} from "vuex";
import {postModule} from "@/store/postModule";

export default createStore({
    // state: {
    //
    // },
    // getters: { //computed свойства
    //
    // },
    // mutations: { // чтоб поменять значение поля в состоянии
    //
    // },
    // actions: { // сайд эффекты + использовать тут mutations для смены state
    //
    // },
    modules: { // для разделения состояния на куски
        post: postModule,
    }
})