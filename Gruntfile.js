module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: ["dist/*"],
    uglify: {
      options: {
        preserveComments: "some",
        sourceMap: true,
        banner:
          '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      build: {
        expand: true,
        cwd: "src",
        src: ["**/*.js", ["!**/*.min.js"]],
        dest: "dist",
        ext: ".min.js"
      }
    },
    cssmin: {
      options: {
        keepBreaks: true
      },
      build: {
        expand: true,
        cwd: "css",
        src: ["**/*.css", ["!**/*.min.css"]],
        dest: "css",
        ext: ".min.css"
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify-es");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.registerTask("default", ["clean", "uglify", "cssmin"]);
};
