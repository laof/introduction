module.exports = [
    {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
            'file-loader'
        ]
    },
    {
        test: /\.ts$/,
        use: 'ts-loader'
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
            'file-loader'
        ]
    },
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
    },
    {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
    },
    {
        test: /\.(csv|tsv)$/,
        use: [
            'csv-loader'
        ]
    },
    {
        test: /\.xml$/,
        use: [
            'xml-loader'
        ]
    },
    {
        test: /\.(html)$/,
        use: [
            {
                loader: 'html-loader',
                options: {
                    interpolate: 'require'
                }
            }
        ]
    }
]