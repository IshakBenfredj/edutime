import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../functions/getFunctions";
import {
  axiosDeleteWithHeader,
  axiosGetWithoutHeader,
  axiosPutWithHeader,
} from "../functions/axiosFunctions";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import UsersPopup from "../components/UsersPopup";
import LoginPopup from "../components/LoginPopup";
import PostDetails from "../components/PostDetails";
import { Link, useNavigate, useParams } from "react-router-dom";
import Name from "../components/Name";
import { FaHeartCircleCheck, FaRegHeart } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import Loading from "../components/loading/Loading";
import { useCreateNotification } from "../functions/newNotification";
import renderPostText from "../functions/renderPostText";
import HelmetHead from "../components/HelmetHead";

export default function PostPage() {
  const [userPost, setUserPost] = useState();
  const [time, setTime] = useState("");
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [openLikes, setOpenLikes] = useState(false);
  const [showAllText, setShowAllText] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingPost, setLoadingPost] = useState(true);
  const [openDetails, setOpenDetails] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const user = useSelector((s) => s.user);
  const { id } = useParams();
  const createNotification = useCreateNotification();
  const navigate = useNavigate();

  const calculateTimeDiff = (createdAt) => {
    const currentTime = new Date();
    const postTime = new Date(createdAt);
    const timeDifference = Math.abs(currentTime - postTime);
    const minutes = Math.floor(timeDifference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      setTime(`منذ ${days} يوم`);
    } else if (hours > 0) {
      setTime(`منذ ${hours} ساعة`);
    } else {
      setTime(`منذ ${minutes} دقيقة`);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await axiosGetWithoutHeader(`/posts/post/${id}`);
        if (!post) {
          navigate("/404");
          return;
        }
        setPost(post);
        setLikes(post.likes);
        calculateTimeDiff(post.createdAt);
      } catch (error) {
        navigate("/404");
      }
    };
    fetchPost();
  }, [id, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(post.userId);
      setUserPost(user);
      setLoadingPost(false);
    };
    if (post) fetchUser();
    const interval = setInterval(() => {
      if (post) calculateTimeDiff(post.createdAt);
    }, 40000);
    return () => clearInterval(interval);
  }, [post]);

  useEffect(() => {
    const fetchCommments = async () => {
      try {
        const data = await axiosGetWithoutHeader(`/comments/${post._id}`);
        setComments(data);
      } catch (error) {
        handleError(error.response.data.error);
      }
      setLoading(false);
    };
    if (post) fetchCommments();
  }, [post, setComments]);

  const handleFollow = async () => {
    try {
      const data = await axiosPutWithHeader(`/users/like/${userPost._id}`);
      setUserPost(data);
      if (!userPost.followers.includes(user._id)) {
        await createNotification({
          userTo: userPost._id,
          userFrom: user._id,
          type: "follow",
        });
      }
    } catch (error) {
      handleError(error.response.data.error);
    }
  };
  const handleLike = async () => {
    if (likes.indexOf(user._id) === -1) {
      setLikes([user._id, ...likes]);
      if (post.userId !== user._id) {
        await createNotification({
          userTo: post.userId,
          userFrom: user._id,
          post: post._id,
          type: "like",
        });
      }
    } else {
      const newLikes = likes.filter((l) => l !== user._id);
      setLikes(newLikes);
    }
    try {
      const data = await axiosPutWithHeader(`/posts/like/${post._id}`);
      setPost(data);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };
  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm("هل ترغب فعلا في حذف هذه المناقشة ؟");
    if (confirmDelete) {
      try {
        const data = await axiosDeleteWithHeader(`/posts/delete/${post._id}`);
        handleSuccess(data.message);
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
  };
  const handleOpen = () => {
    setOpenDetails(true);
    document.body.classList.add("overflow-hidden");
  };

  return (
    <>
      <HelmetHead title={post?.title || 'Loading ...'} desc={post?.text || 'Loading ...'} />
      {openLikes && (
        <UsersPopup
          usersLikesId={likes}
          setPopup={setOpenLikes}
          showUsers={true}
        />
      )}
      {openPopup && <LoginPopup set={setOpenPopup} />}
      {post && (
        <PostDetails
          post={post}
          setPost={setPost}
          loading={loading}
          userPost={userPost}
          comments={comments}
          setComments={setComments}
          likes={likes}
          setLikes={setLikes}
          setOpenDetails={setOpenDetails}
          openDetails={openDetails}
        />
      )}
      {loadingPost && !userPost ? (
        <Loading />
      ) : (
        post &&
        userPost && (
          <div className="pt-14 md:pb-2 pb-16 bg-bgcolor min-h-screen relative">
            <div className="py-7 lg:w-1/2 mx-auto md:w-3/5 w-[95%] space-y-3">
              <div
                className={`bg-white rounded-md overflow-hidden shadow-md md:space-y-2 space-y-1`}
              >
                <div className="px-3 pt-3 md:space-y-3 space-y-1">
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/profile/${userPost._id}`}
                      className="flex items-center gap-2 font-bold text-primary"
                    >
                      <img
                        src={userPost.image}
                        className="w-9 h-9 rounded-full object-cover"
                        alt=""
                      />
                      <div className="">
                        <Name
                          name={userPost.name}
                          checkmark={userPost.checkmark}
                          width={"w-4"}
                        />
                        <div className="text-color text-xs flex gap-1">
                          <span>
                            {userPost.isCenter ? "معلم/مركز" : "متعلم"}
                          </span>{" "}
                          |<span>{time}</span>
                        </div>
                      </div>
                    </Link>
                    <div className="flex items-center gap-2">
                      {user && userPost._id !== user._id && (
                        <span
                          className="text-2xl md:text-3xl text-red-500"
                          onClick={handleFollow}
                        >
                          {userPost.followers.includes(user._id) ? (
                            <FaHeartCircleCheck />
                          ) : (
                            <FaRegHeart />
                          )}
                        </span>
                      )}
                      {user && (user.isAdmin || userPost._id === user._id) && (
                        <span
                          onClick={handleDelete}
                          className="bg-red-400 text-white cursor-pointer rounded-full p-1"
                        >
                          <MdDeleteForever size={24} />
                        </span>
                      )}
                    </div>
                  </div>
                  <h2 className="md:text-xl text-lg font-bold">{post.title}</h2>
                  <p className=" text-color md:text-base text-sm leading-[1.5] break-words">
                    {post.text.length <= 300 ? (
                      renderPostText(post.text)
                    ) : showAllText ? (
                      <>
                        {renderPostText(post.text)}
                        <p
                          className="font-bold text-black mt-1 cursor-pointer"
                          onClick={() => setShowAllText(false)}
                        >
                          إقرأ أقل
                        </p>
                      </>
                    ) : (
                      <>
                        {renderPostText(post.text.slice(0, 300))} ...
                        <p
                          className="font-bold text-black mt-1 cursor-pointer"
                          onClick={() => setShowAllText(true)}
                        >
                          إقرأ المزيد ...
                        </p>
                      </>
                    )}
                  </p>
                </div>
                {post.image && (
                  <img src={post.image} className="mx-auto" alt="" />
                )}
                {user ? (
                  <div className="px-3 pb-2 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span
                        onClick={handleLike}
                        className="text-2xl cursor-pointer rounded-full bg-bgcolor p-2 flex items-center gap-2"
                      >
                        {likes.includes(user._id) ? (
                          <AiFillLike className="text-title" />
                        ) : (
                          <AiOutlineLike />
                        )}
                        <span className="md:text-base text-sm">
                          {likes.length}
                        </span>
                      </span>
                      <span
                        onClick={handleOpen}
                        className="text-2xl cursor-pointer rounded-full bg-bgcolor p-2 flex items-center gap-2"
                      >
                        <BiCommentDetail />
                        <span className="md:text-base text-sm">
                          {comments.length}
                        </span>
                      </span>
                    </div>
                    <span
                      onClick={() => setOpenLikes(true)}
                      className="md:text-base text-sm cursor-pointer font-semibold hover:unde"
                    >
                      {likes.length} إعجاب
                    </span>
                  </div>
                ) : (
                  <div className="px-3 pb-2 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span
                        onClick={() => setOpenPopup(true)}
                        className="text-2xl cursor-pointer rounded-full bg-bgcolor p-2 flex items-center gap-2"
                      >
                        <AiOutlineLike />
                        <span className="md:text-base text-sm">
                          {likes.length}
                        </span>
                      </span>
                      <span
                        onClick={() => setOpenPopup(true)}
                        className="text-2xl cursor-pointer rounded-full bg-bgcolor p-2 flex items-center gap-2"
                      >
                        <BiCommentDetail />
                        <span className="md:text-base text-sm">
                          {comments.length}
                        </span>
                      </span>
                    </div>
                    <span
                      onClick={() => setOpenLikes(true)}
                      className="md:text-base text-sm cursor-pointer font-semibold hover:unde"
                    >
                      {likes.length} إعجاب
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
