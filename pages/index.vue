<template>
    <div class="w-100">
        <!-- <p>
            <a class="btn btn-primary" data-bs-toggle="collapse" href="#menu" role="button" aria-expanded="false"
                aria-controls="menu">
                Link with href
            </a>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#menu"
                aria-expanded="false" aria-controls="menu">
                Button with data-bs-target
            </button>
        </p> -->
        <!-- <div class="collapse" id="menu">
            <div class="card card-body">
                Some placeholder content for the collapse component. This panel is hidden by default but revealed when the
                user activates the relevant trigger.
            </div>
        </div> -->
        <div class="row no-gutter d-flex align-items-stretch h-100 _w-100  position-absolute position-fixed h-100">
            <div class="col-2 col-md-3 overflow-auto">
                <div class="ps-3 h-100 bg-white scroll shadow _navbar navbar-collapse collapse-horizontal"
                    _role="navigation" id="menu" style="max-height:100vh;padding-top:5rem;overflow:auto;">
                    <div v-for="x in menu" :key="x" :class="x.title == 'Dashboard' ? 'bg-purple text-white' : 'bg-white gray'">
                        <hr v-if="x.title == 'divider'" />
                        <div v-else
                            class="fs-6 p-0 px-md-2 py-3 _py-md-4  menu-hover text-secondary pe-cursor d-flex justify-content-center justify-content-md-start align-items-center">
                            <Icon :icon="x.icon" class="fs-5" />
                            <span class="d-none d-md-block ms-3">
                                {{ x.title }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-10 col-md-9 _bg-danger">
                <div class="overflow-auto pb-5 w-100" style="max-height:100vh;min-width:100%">
                    <div class="pt-4 bg-succes">
                        <div class="float-end d-flex justify-content-between align-items-center pe-4" style="min-width:300px">
                            <span class="purple-light fw-bold">Take a tour</span>
                            <Icon icon="ic:round-mail" class="fs-3 purple" />
                            <Icon icon="zondicons:notification" class="fs-3  purple-light" />
                            <img class="rounded-circle " src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600" width="50px" height="50px" />
                        </div>
                    </div>
                    <div class="py-5 mt-3 w-100">
                        <span class="text-nowrap h1 fw-bold purple">Update Medical Record</span><br>
                        <span class="small gray">
                            Click the tabs to view and edit patent medical details
                        </span>
                    </div>
                    <form @submit.prevent="update" class="rounded py-5 px-4 px-md-5 me-2 mx-md-5 bg-white">
                        <div v-for="test in tests" :key="test">
                            <div class="text-start">
                                <div class="fw-bold fs-5 purple">{{ test.title }}</div>
                                <div class="row ps-2 m-0 mw-100 mt-3">
                                    <div class="col-6 col-md-4 col-lg-3" v-for="x in test.investigations" :key="x">
                                        <div class="">
                                            <div class="form-check my-3 d-flex w-100 align-items-center">
                                                <input type="checkbox"
                                                    class="form-check-input fs-2 border text-danger my-auto"
                                                    _style="min-height:300px" v-model="x.isSelected">
                                                <span class="form-check-label ms-1 _text-nowrap fw-bold">{{ x.title
                                                }}t</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr class="my-4" />

                        </div>

                        <div>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label class="text-secondary mb-2">
                                            CT San
                                        </label>
                                        <select class="form-select text-secondary" v-model="ct_scan">
                                            <option :value="null" disabled>* Specify</option>
                                            <option class="">Scan needed in the left cerebral hemisphere</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label class="text-secondary mb-2">
                                            MRT
                                        </label>
                                        <select class="form-select text-secondary small" v-model="mri">
                                            <option class="" :value="null" selected disabled>* Sepcify</option>
                                            <option class="" ct_scan>Full body MRI</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-end mt-3">
                            <button class="btn bg-purple fw-bold text-white p-2 text-sm" type="submit">
                                Save and Send
                            </button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from "@iconify/vue"
import Widget from "@/lib/widget"

export default {
    data() {
        return {
            menu: [
                { title: "Dashboard", icon: "ic:round-dashboard", link: "" },
                { title: "Profile", icon: "mdi:user", link: "" },
                { title: "Services", icon: "grommet-icons:dropbox", link: "" },
                { title: "Medical Record", icon: "solar:clipboard-add-bold", link: "" },
                { title: "Care Wallet", icon: "fontisto:wallet", link: "" },
                { title: "Messages", icon: "mdi:message", link: "" },
                { title: "Resources", icon: "game-icons:bookshelf", link: "" },
                { title: "divider", icon: "", link: "" },
                { title: "Account Settings", icon: "icon-park-solid:setting", link: "" },
                { title: "Contact Support", icon: "ic:round-support", link: "" },
                { title: "Logout", icon: "majesticons:logout", link: "" },
            ],
            tests: [],
            ct_scan: null,
            mri: null
        }
    },
    components: {
        Icon
    },
    methods: {
        async getCategories() {
            Widget.openLoading()
            const query = gql`query {
                investigation_types {
                        id
                        title
                        investigations {
                            id
                            title
                        }
                    }
                }`
            const { data, error } = await useAsyncQuery(query)
            Widget.dismiss()
            this.tests = data._value.investigation_types
            console.log("Invest", data)
            // this.dets
        },
        async login() {
            const loginQuery = gql`mutation login($email: String!, $password: String!) {
                login(
                    email: $email 
                    password: $password
                )
            }`
            const vars = {
                email: "tester@kompletecare.com",
                password: "password"
            }
            const { data, error } = await useAsyncQuery(loginQuery, vars)

            // init cookie for github token
            const cookie = useCookie("token");
            // set cookie value if not set
            cookie.value = cookie.value || data._rawValue.login;

            console.log("data", data, error)
            console.table("data", data._rawValue.login, error)
            localStorage.setItem("token", data._rawValue.login, error)
        },
        async update() {
            const query = gql`mutation add($ctscan: String!,$mri: String!, $inv:[ID!]!, $dev:String!){  
                add_medical_record(
                    ctscan:$ctscan,
                    mri:$mri,
                    investigations: $inv,
                    developer: $dev
                ){
                    investigations {
                    title
                    }
                }
            }`
            // this.$nuxt.$loading.start()
            // setTimeout(() => this.$nuxt.$loading.finish(), 3000)
            let selected = []
            this.tests.forEach((test) => {
                selected = [...selected, ...test.investigations.filter((e) => e.isSelected)]
            })
            console.log(selected)
            const variables = {
                ctscan: this.ct_scan,
                mri: this.mri,
                inv: selected.map((e) => e.id),
                dev: "Abdulbateen"
            }

            const { data, error } = await useAsyncQuery(query, variables)
            console.log(data, error)
            const { $nt } = useNuxtApp()
            $nt.show("Bataino")

        }
    },
    async beforeMount() {
        // this.$root.$loading.start();
        if (localStorage.getItem("token") == undefined || localStorage.getItem("token") == null || !localStorage.getItem("token")) {
            await this.login()
        }
        await this.getCategories()
        console.log("Token", localStorage.getItem("token"))


    }
}
</script>

<style>
.menu-hover:hover {
    background-color: var(--purple);
    color: white !important;
    cursor: pointer;
}

.scroll {}

.scroll:active::-webkit-scrollbar-thumb,
.scroll:focus::-webkit-scrollbar-thumb,
.scroll:hover::-webkit-scrollbar-thumb {
    visibility: visible;
}

.scroll::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    visibility: hidden;
}

.scroll::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

body {
    background-color: lightgray;

    @media(max-width:768px) {
        font-size: 10px
    }
}

input[type=checkbox] {
    border: 2px solid lightgray !important;
    border-radius: 3px !important;
    max-width: 20px !important;
    min-width: 20px !important;
    min-height: 20px !important;
    max-height: 20px !important;
}

input[type=checkbox]:checked {
    border: 0px !important;
    background-color: purple;
    box-shadow: none;
}
</style>