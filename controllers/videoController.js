import Video from "../models/Video.js"
import User from "../models/User.js"

export const addVideo = async (req, res) => {
  try {
    const newVideo = new Video (req.body);
    newVideo.userId = req.user.id;
    await newVideo.save();
    return res.status(200).json({ success: true, message : "Video added Successfully!!", data: newVideo });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something Went wrong!!", error: error.message});
  }
};

export const updateVideo = async(req, res) => {
  try {
    const newVideo = await Video.findById(req.params.id);
    if (!newVideo) return res.status(404).json({ success: false, message: "Video not found", error: null });
    if (req.user.id === newVideo.userId) {
      const updatedVideo = await Video.findByIdAndUpdate({ _id: req.params.id }, { $set:req.body }, { new: true });
      return res.status(200).json({ success: true, message : "Video updated Successfully!!", data: updatedVideo });
    } else {
      return res.status(500).json({ success: false, message: "You can update only your video!!", error: error.message});
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something Went wrong!!", error: error.message});
  }
};

export const getVideo = async (req, res) => {
  try {
    const newVideo = await Video.findById(req.params.id);
    if (!newVideo) return res.status(404).json({ success: false, message: "Video not found", error: null });
    return res.status(200).json({ success: true, message : "Video Found Successfully!!", data: newVideo });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something Went wrong!!", error: error.message});
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const newVideo = await Video.findById(req.params.id);
    if (!newVideo) return res.status(404).json({ success: false, message: "Video not found", error: null });
    if (req.user.id === newVideo.userId) {
      await Video.findByIdAndDelete({ _id: req.params.id });
      return res.status(200).json({ success: true, message : "Video Deleted Successfully!!" });
    } else {
      return res.status(500).json({ success: false, message: "You can delete only your video!!", error: error.message});
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something Went wrong!!", error: error.message});
  }
};

export const addView = async (req, res) => {
  try {
    const newVideo = await Video.findById(req.params.id);
    if (!newVideo) return res.status(404).json({ success: false, message: "Video not found", error: null });
    newVideo.views += 1;
    await newVideo.save();
    return res.status(200).json({ success: true, message : "The View has been increased" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something Went wrong!!", error: error.message});
  }
};

export const trend = async (req, res) => {
  try {
    const videos = await Video.find().sort({ views: -1});
    return res.status(200).json({ success: true, message : "Video Found Successfully!!", data: videos });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something Went wrong!!", error: error.message});
  }
};

export const random = async (req, res) => {
  try {
    // Fetch all documents from the collection
    const allVideos = await Video.find().lean(); // Using lean() to get plain JavaScript objects
    console.log(`Total number of videos: ${allVideos.length}`);
    
    // Check if there are any documents
    if (allVideos.length === 0) {
      console.log('No videos found');
      return res.status(404).json({ success: false, message: "No videos found", data: null });
    }
    
    // Shuffle the array
    for (let i = allVideos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allVideos[i], allVideos[j]] = [allVideos[j], allVideos[i]];
    }
    
    // Select the first 8 videos from the shuffled array
    const selectedVideos = allVideos.slice(0, 8);
    console.log('Selected videos:', selectedVideos.length);
    
    return res.status(200).json({ success: true, message: "Videos found successfully", data: selectedVideos });
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};

// export const random = async (req, res) => {
//   try {
//     const videos = await Video.aggregate({ $sample: {size: 40}} );
//     return res.status(200).json({ success: true, message : "Video Found Successfully!!", data: videos });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Something Went wrong!!", error: error.message});
//   }
// };

export const sub = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;
    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something Went wrong!!", error: error.message});
  }
};

export const getByTag = async (req, res) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Something Went wrong!!", error: error.message});
  }
};

export const search = async (req, res) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Something Went wrong!!", error: error.message});
  }
};
