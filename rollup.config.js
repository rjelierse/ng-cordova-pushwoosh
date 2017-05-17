import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
    entry: 'src/pushwoosh.module.js',
    dest: 'dist/ng-cordova-pushwoosh.min.js',
    sourceMap: true,
    format: "iife",
    plugins: [
        babel(),
        uglify(),
    ],
    external: ['angular'],
    globals: {
        angular: 'angular',
    },
};
