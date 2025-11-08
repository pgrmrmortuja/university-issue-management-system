import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useNavigate, useParams } from 'react-router';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateIssue = () => {
  const [item, setItem] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssue = async () => {
      const response = await axiosSecure.get(`/issue-id/${id}`);
      setItem(response.data);
    };

    fetchIssue();
  }, [id]);

  const {
    _id,
    student_name,
    student_email,
    student_image,
    issue_title,
    issue_category,
    issue_location,
    issue_date,
    issue_time,
    issue_details,
    verification_status,
    issue_image,
    submit_date
  } = item;

  console.log("item gula", item);

  const onSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

    // ✅ Collect form data directly
    const student_name = form.student_name.value;
    const student_email = form.student_email.value;
    const student_image = form.student_image.value;
    const issue_title = form.issue_title.value;
    const issue_category = form.issue_category.value;
    const issue_location = form.issue_location.value;
    const issue_date = form.issue_date.value;
    const issue_time = form.issue_time.value;
    const issue_details = form.issue_details.value;
    const verification_status = form.verification_status.value;
    const imageFile = form.issue_image.files[0];

    console.log("Collected form data:", {
      student_name,
      student_email,
      student_image,
      issue_title,
      issue_category,
      issue_location,
      issue_details,
      issue_date,
      issue_time,
      verification_status,
      imageFile,
    });

    try {
      let imageUrl = issue_image; 

     
      if (imageFile) {
        const imageData = new FormData();
        imageData.append("image", imageFile);

        const res = await axiosPublic.post(image_hosting_api, imageData, {
          headers: { "content-type": "multipart/form-data" },
        });

        if (res.data.success) {
          imageUrl = res.data.data.display_url;
        }
      }

      // 🏠 Step 2 — Create updated issue object
      const issue = {
        student_name,
        student_email,
        student_image,
        issue_title,
        issue_category,
        issue_location,
        issue_date,
        issue_time,
        issue_details,
        verification_status,
        issue_image: imageUrl, // ✅ use new or old image
        submit_date,
      };

      // 💾 Step 3 — send to your server
      const issueRes = await axiosSecure.put(`/update-issue/${_id}`, issue);
      console.log(issueRes.data);

      if (issueRes.data.modifiedCount > 0 || issueRes.data.acknowledged) {
        navigate("/dashboard/my-issues");
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${issue_title} updated successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
      } else {
        Swal.fire({
          position: "top",
          icon: "warning",
          title: "No changes were made!",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <title>Update Issue | University</title>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-4xl p-8 space-y-6 bg-red-100 rounded-2xl shadow-lg"
      >
        <h2 className="mb-10 text-3xl font-bold text-center text-black">
          Update Issue Form
        </h2>

        {/* Student Info */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Student Name
            </label>
            <input
              type="text"
              name="student_name"
              defaultValue={user?.displayName || ""}
              readOnly
              className="w-full bg-white border-2 border-gray-300 rounded-lg input input-bordered"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Student Email
            </label>
            <input
              type="email"
              name="student_email"
              defaultValue={user?.email || ""}
              readOnly
              className="w-full bg-white border-2 border-gray-300 rounded-lg input input-bordered"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Student Image URL
            </label>
            <input
              type="text"
              name="student_image"
              defaultValue={user?.photoURL || ""}
              readOnly
              className="w-full bg-white border-2 border-gray-300 rounded-lg input input-bordered"
            />
          </div>
        </div>

        {/* Issue Inputs */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              name="issue_category"
              value={issue_category || ""}
              onChange={(e) => setItem({ ...item, issue_category: e.target.value })}
              className="w-full px-4 py-2 text-black bg-white border-2 border-gray-300 rounded-lg"
            >
              <option value="" disabled>Select a category</option>
              <option value="Academic">Academic</option>
              <option value="Classroom">Classroom</option>
              <option value="Finance">Finance</option>
              <option value="Hall">Hall</option>
              <option value="IT">IT</option>
              <option value="Library">Library</option>
              <option value="Canteen">Canteen</option>
              <option value="Transport">Transport</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Issue Title
            </label>
            <input
              type="text"
              name="issue_title"
              defaultValue={issue_title}
              placeholder="Issue Title"
              className="w-full px-4 py-2 text-black bg-white border-2 border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Issue Location (e.g., Room 101)
            </label>
            <input
              type="text"
              name="issue_location"
              defaultValue={issue_location}
              placeholder="Issue Location"
              required
              className="w-full px-4 py-2 text-black bg-white border-2 border-gray-300 rounded-lg"
            />
          </div>
        </div>


        {/* Upload Image */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Upload Image
          </label>

          {(previewImage || issue_image) && (
            <img
              src={previewImage ? previewImage : issue_image}
              alt="Issue preview"
              className="w-32 h-32 object-cover rounded-lg mb-2"
            />
          )}

          <input
            type="file"
            name="issue_image"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const imageURL = URL.createObjectURL(file);
                setPreviewImage(imageURL);
              }
            }}
            className="w-full text-black bg-white border-2 border-gray-300 rounded-lg file-input"
          />
        </div>



        {/* Date & Time */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Status
            </label>
            <input
              type="text"
              name="verification_status"
              defaultValue={verification_status}
              readOnly
              className="w-full px-4 py-2 text-black bg-white border-2 border-gray-300 rounded-lg cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Issue Date
            </label>
            <input
              type="date"
              name="issue_date"
              defaultValue={issue_date}
              className="w-full px-4 py-2 text-black bg-white border-2 border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Issue Time
            </label>
            <input
              type="time"
              name="issue_time"
              defaultValue={issue_time}
              className="w-full px-4 py-2 text-black bg-white border-2 border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Details */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Issue Details
          </label>
          <textarea
            name="issue_details"
            placeholder="Describe the issue in detail..."
            defaultValue={issue_details}
            className="w-full h-28 text-black bg-white border-2 border-gray-300 rounded-lg"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 font-bold text-black bg-red-500 border-none rounded-lg btn hover:bg-red-600 hover:text-white"
        >
          Update Issue
        </button>
      </form>
    </div>
  );
};


export default UpdateIssue;