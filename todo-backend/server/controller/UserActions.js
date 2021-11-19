const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.VerifyUser = async (token) => {
	try {

		const ticket = await client.verifyIdToken({
			idToken:token,
			audience: process.env.GOOGLE_CLIENT_ID
		});
		const payload = ticket.getPayload();
		const {email, name, picture} = payload;
		return {email:email, name:name, picture:picture};
	}
	catch(err) {
		return false;
	}
}