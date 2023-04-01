// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            link: [
                {
                    rel: "stylesheet",
                    href: "/bootstrap/css/bootstrap.min.css",
                }
            ],
            script: [
                {
                    src: "/bootstrap/js/bootstrap.min.js"
                }
            ]
        }
    },
    css: ['~/styles/main.less'],
    // 'bootstrap-vue/nuxt'
    modules: [
        '@nuxtjs/apollo', 
        // '@nuxtjs/toast'
    ],
    plugins: [ 
        '@/plugins/vue-plugin.js'
      ],
    apollo: {
        authType: "Bearer",
        authHeader: "Authorization",
        tokenStorage: "cookie",
        clients: {
            default: {
                httpEndpoint: 'https://testdrive.kompletecare.com/graphql',
                tokenName: 'token',
            }
        },
    },
})
