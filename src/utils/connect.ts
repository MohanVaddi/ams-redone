import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DBNAME = 'ams';
const connect = async () => {
    try {
        await mongoose.connect(
            `${process.env['MONGODB_URI'] as string}${DBNAME}${
                process.env['MONGODB_URI_QueryString'] as string
            }`
        );
        console.log('DB Connected!');
    } catch (err) {
        console.error(err);
        // ! Exit process with failure
        process.exit(1);
    }
};

const home = mongoose.createConnection(
    `${process.env['MONGODB_URI'] as string}`,
    {
        retryWrites: true,
        w: 'majority',
    }
);
home.on('error', (err: any) => {
    console.log(err.message);
    process.exit(1);
});
home.once('open', () => {
    console.log('Connected to mongodb');
});

export { connect, home };
