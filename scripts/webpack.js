// ===============================================================
// A PART OF BOOTSTRAP-VUE - Pooya Parsa <pooya@pi0.ir>
// https://github.com/bootstrap-vue/bootstrap-vue
// ===============================================================

const path = require('path');
const Webpack = require('webpack');

const config = module.exports = {
    plugins: []
};

// Set context to root of project
config.context = path.resolve(__dirname, '..');

// Resolver config
config.resolve = {
    extensions: ['.js', '.vue'],
    enforceExtension: false
};

config.resolveLoader = {
    modules: config.resolve.modules
};

// Client entry
config.entry = {
    bootstrapVue: path.resolve(__dirname, '../index')
};

// Basic output config
config.output = {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bootstrap-vue.js'
};

// Config Module Loaders
config.module = {

    loaders: [
        // Vue
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        // Vue HTML
        {
            test: /\.html$/,
            loader: 'vue-html-loader'
        },
        // JS
        {
            test: /\.js$/,
            loader: 'babel-loader',
            // important: exclude files in node_modules, otherwise it's going to be really slow!
            exclude: /node_modules|vendor/
        },
        // JSON
        {
            test: /\.json$/,
            loader: 'json-loader'
        },
        // CSS
        {
            test: /\.css$/,
            loader: 'vue-style-loader!css-loader'
        },
        // SCSS
        {
            test: /\.scss$/,
            loader: 'vue-style-loader!sass-loader'
        },
        // Font
        {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file'
        },
        // Media
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url',
            query: {
                // limit for base64 inlining in bytes
                limit: 10000,
                // custom naming format if file is larger than the threshold
                name: '[name].[ext]?[hash]'
            }
        },
        // Node
        {
            test: /\.node$/,
            loader: 'node-loader'
        }
    ]
};

// Config Vue style loader
config.plugins.push(new Webpack.LoaderOptionsPlugin({
    options: {
        vue: {
            loaders: {
                scss: 'css-loader!sass-loader' // This will match all <style lang=scss> tags
            }
        }
    }
}));

if (process.env.NODE_ENV === 'production') {
    // Production Config
    config.devtool = '#source-map';

    // Pass build environment inside bundle
    // This will Strip comments in Vue code & hort-circuits all Vue.js warning code
    config.plugins.push(new Webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }));

    // The UglifyJsPlugin will no longer put loaders into minimize mode, and the debug option has been deprecated.
    config.plugins.push(new Webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }));

    // Minify with dead-code elimination
    config.plugins.push(new Webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false},
        sourceMap: true
    }));
} else {
    // Development Config
    config.devtool = '#eval';
}
