
const handler = (req, res) => {
    // console.log(req.query);
    console.log(req.cookies);

    res.status(200).json('this is [...id]')

    
}

export default handler;