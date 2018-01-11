import uglify from 'rollup-plugin-uglify-es';

export default { 
    input       : './src/background.js',
    output        : {
        file : 'dist/background.js',
        format: 'iife'
    },
    plugins     : [ uglify() ]
};