const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: ``
      }
    }
  },
  // chainWebpack: (config) => {
  //       // Customizing image handling with url-loader
  //       config.module
  //       .rule('images')
  //       .test(/\.(png|jpe?g|gif|svg)$/)
  //       .use('url-loader')
  //       .loader('url-loader')
  //       .options({
  //         limit: 8192, // Inline files smaller than 8KB as base64 URLs
  //         // name: 'assets/images/[name].[ext]', // Custom naming pattern for larger images
  //       });
  // },
  // configureWebpack: {
  //   module:{
  //     rules:[
  //       {
  //         test: /\.(png|jpe?g|gif|svg)$/,
  //         use: [
  //           {
  //             loader: 'url-loader',
  //             options: {
  //               limit: 8192,
  //               // name: 'assets/images/[name].[ext]',
  //             },
  //           },
  //         ],
  //       },
  //     ]
  //   }
  // }
})
