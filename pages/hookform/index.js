import { useForm } from "react-hook-form";
import convertToBase64 from '../../actions/functionHanle/convertImg';
import axios from "axios";

const HookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name:'',
      video: {
        type: '',
        src: '',
      }
    },
  });

  const onSubmit = async (data) => {
    console.log(data.video);
    const video = data.video[0]
    const type = video.type.includes('video') ? 'video' : 'image';
    const base64Video = await convertToBase64(video);
    console.log(type);
    const res = await axios({
        method: 'POST',
        url: '/api/video',
        data: {
            ...data,
            video: { type, src: base64Video },
        },
        headers: {
            'Content-Type': 'application/json',
        },
    })
    console.log(res)
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2>HookForm</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-5">
          <label className="mr-5" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            {...register("name")}
          />
        </div>
        <div className="my-5">
          <label className="mr-5" htmlFor="video">
            Video
          </label>
          <input
            type="file"
            placeholder="Video"
            id="video"
            {...register("video")}
          />
        </div>
        <div className="my-5">
            <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default HookForm;
