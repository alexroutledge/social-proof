require.config({
  // Initialize the application with the main application file
  deps: ["main"],

  paths: {
    // JavaScript folders
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",

    // Libraries
    jquery: "../assets/js/libs/jquery",
    jqueryui: "../assets/js/libs/jquery.ui",
    jquerymetadata: "../assets/js/libs/jquery.metadata",
    underscore: "../assets/js/libs/underscore",
    backbone: "../assets/js/libs/backbone",
 
    // Shim Plugin
    use: "../assets/js/plugins/use"
  },

  use: {
    backbone: {
      deps: ["use!underscore", "jquery"],
      attach: "Backbone"
    },
  
    jqueryui: {
      deps: ["jquery"]
    },

    underscore: {
      attach: "_"
    }

  }

});