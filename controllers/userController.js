import User from "../models/User.js"
import Video from "../models/Video.js";

export const updateUser = async function(req, res) {
  if(req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findById({ _id: req.params.id});
      updatedUser.name = req.body.name ? req.body.name: updatedUser.name;
      await updatedUser.save();
      return res.status(200).send({ success: true, message: "You account updated successfully!!", data: updatedUser });
    } catch (error) {
      return res.status(400).send({ success: false, message: "You can not update your account!!", data: error.message });
    }
  } else {
    return res.status(400).send({ success: false, message: "You can update your account only" });
  }
};

export const deleteUser = async (req, res) => {
  if(req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete({ _id: req.params.id});
      return res.status(200).send({ success: true, message: "You account deleted successfully!!" });
    } catch (error) {
      return res.status(400).send({ success: false, message: "You can not delete your account!!", data: error.message });
    }
  } else {
    return res.status(400).send({ success: false, message: "You can delete your account only" });
  }
};

export const getUser = async (req, res) => {
  if(req.params.id === req.user.id) {
    try {
      const userInfo = await User.findById({ _id: req.params.id});
      return res.status(200).send({ success: true, message: "You account updated successfully!!", data: userInfo });
    } catch (error) {
      return res.status(400).send({ success: false, message: "You can not update your account!!", data: error.message });
    }
  } else {
    return res.status(400).send({ success: false, message: "You can update your account only" });
  }
};

export const subscribeUser = async (req, res) => {
  // if(req.params.id !== req.user.id) {
    try {
      await User.findById({ _id: req.user.id }, {$push: { subscribedUsers: req.params.id }}, {$inc: { subscribers : 1 }} );
      // await User.findByIdAndUpdate({_id: req.params.id }, {$inc: { subscribers : 1 }});
      return res.status(200).json({ success: true, message: "Subscription Successfully!!"});
    } catch (error) {
      return res.status(500).json({ success: false, message: "Something went worng!", error: error.message});
    }
  // } else {

  // }

};

export const unsubscribeUser = async (req, res) => {
  try {
    await User.findById({ _id: req.user.id }, {$pull: { subscribedUsers: req.params.id }}, {$inc: { subscribers : -1 }} );
    // await User.findByIdAndUpdate({_id: req.params.id }, {$inc: { subscribers : -1 }});
    return res.status(200).json({ success: true, message: "Unsubscription Successfully!!"});
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went worng!", error: error.message});
  }
};

export const likeVideos = async (req, res) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{likes:id},
      $pull:{dislikes:id}
    })
    res.status(200).json("The video has been liked.")
  } catch (err) {
    return res.status(500).json({ success: false, message: "Something went worng!", error: err.message});
  }
};

export const dislikeVideos = async (req, res) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{dislikes:id},
      $pull:{likes:id}
    })
    res.status(200).json("The video has been disliked.")
  } catch (err) {
    return res.status(500).json({ success: false, message: "Something went worng!", error: err.message});
  }
};
