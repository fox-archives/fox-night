

const object = {
	devServer: {
		proxy: 'http://localhost:3000',
	},
}

if (process.env.IS_NGROK) {
	object.devServer.https = true
	object.devServer.host = '0.0.0.0'
}

module.exports = object
