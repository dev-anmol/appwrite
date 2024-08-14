const sdk = require('node-appwrite')


const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your api end point
    .setProject('66bc37480002b84a5db7') // Your Project ID
    .setKey('a8bdd6e51f2eeb51efbe08c63a5835b4acc987df0d04bb04b67f370313b660c721099959b275082b64f629e5137b4ee57631fc49c702da505a9134675d9c3158b7cd3b3e3cca005e153248a94e2b3dc0e4c013ddd7185d9c3d0e8d6d8496040463b1a7e394a1f27449755b780b3639b0aa1c3ac9bef233f3ecef64873d3ff3b1') // Your secret API key

const messaging = new sdk.Messaging(client);

const sendEmail = async () => {
    const message = await messaging.createEmail(
        '2345234a-3432-45f-324324gf43243', //messageId
        'Welcome!', //subject
        'Hi', //content
        [], //topics (optional)
        ['66bc37b6003428746edb'] //users (optional)
    );

    console.log(message);
}

const sendSMS = async () => {
    const message = await messaging.createSms(
        '2345234a-3432-45f-687', //message Id
        'This is the test', //content
        [], //topics
        ['66bc37b6003428746edb']
    )
    console.log(message)
}

sendSMS();