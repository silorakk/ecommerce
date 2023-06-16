import { useState } from "react";
import Notification from "@/components/Notification";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isNotifcationShown, setIsNotificationShown] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

  const addProduct = async () => {
    const res = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        description: description,
        imageUrl: imageUrl,
      }),
    });
    setIsNotificationShown(true);
  };

  const updateNotifcationState = () => {
    setIsNotificationShown(!isNotifcationShown);
  };
  return (
    <>
      <Notification
        title="Product added successfully!"
        description="Users can now see it on the product page."
        show={isNotifcationShown}
        setShow={updateNotifcationState}
      />
      <div>
        <div className="w-96 p-12">
          <h3 className="font-bold">Add product</h3>
          <div className="flex items-center justify-between">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6"
            >
              Name
            </label>
          </div>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6"
            >
              Description
            </label>
          </div>
          <div className="mt-2">
            <input
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium leading-6"
            >
              Image Url
            </label>
          </div>
          <div className="mt-2">
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            type="button"
            onClick={addProduct}
            className="rounded-full mt-12 bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Product
          </button>
        </div>
      </div>
    </>
  );
}
