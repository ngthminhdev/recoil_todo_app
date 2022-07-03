import User from "../../../models/User";
import connectDB from "../../../database";
import withAuth from "../../../app/middleware/withAuth"
import withRoles from "../../../app/middleware/withRoles"

connectDB();

const deleteHandler = async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'POST': 
            try {
                const { id } = req.body;
                await User.findOneAndDelete({ _id: id })
                return res.status(200).json({
                    success: true,
                    message: 'User deleted successfully',
                })
            } catch (error) {
                return res.status(404).json({
                    success: false,
                    error: error,
                })
            }
        break;
        default: return res.status(500).json({ success: false, message: 'Failed to connect to server!'})
    }
}

export default withAuth(withRoles(deleteHandler, 'admin'))