const PORT = 8000;

const express = require('express')
const app = express();
const uuid4 = require('uuid4')
const cors = require('cors')

app.use(cors());
app.use(express.json())

const sdk = require('node-appwrite')


const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your api end point
    .setProject('66bc37480002b84a5db7') // Your Project ID
    .setKey('a8bdd6e51f2eeb51efbe08c63a5835b4acc987df0d04bb04b67f370313b660c721099959b275082b64f629e5137b4ee57631fc49c702da505a9134675d9c3158b7cd3b3e3cca005e153248a94e2b3dc0e4c013ddd7185d9c3d0e8d6d8496040463b1a7e394a1f27449755b780b3639b0aa1c3ac9bef233f3ecef64873d3ff3b1') // Your secret API key

const messaging = new sdk.Messaging(client);
const users = new sdk.Users(client);

app.post('/register', async (req, res) => {
    try {
        const user = req.body;
        const id = uuid4()

        const result = await users.create(
            id, //userId
            user.email, //email (optional)
            user.tel //telephone (optional)
        )

        console.log(result);

        if (result) {
            sendEmail(result)
            sendSMS(result)
        }
    } catch (err) {
        console.error(err)
    }
})

const sendEmail = async (result) => {
    const id = uuid4();
    const email = result.email;
    const userId = result['$id']
    const message = await messaging.createEmail(
        id,
        `welcome ${email}`, //subject
        'Thank you so much for signing up! We welcome you to our email community', //content
        [], //topics (optional)
        [userId] //users (optional)
    );
    console.log(message)
}

const sendSMS = async (result) => {
    const id = uuid4();
    const userId = result['$id']
    const message = await messaging.createSms(
        id,
        'Thank you so much for signing up! We welcome you to our SMS community', //content
        [], //topics
        [userId]
    )
    console.log(message)
}

app.listen(PORT)
