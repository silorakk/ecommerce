import { useEffect, useState } from "react";
import Notification from "@/components/Notification";
import AdminUsersTable from "@/components/AdminUsersTable";
import { User } from "@prisma/client";
import ProductImageSelector from "@/components/ProductImageSelector";
import ImageSelectModal from "@/components/modals/ImageSelectModal";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isImageSelectModalDisplayed, setIsImageSelectModalDisplayed] =
    useState(false);

  const [isNotifcationShown, setIsNotificationShown] = useState(false);

  const addProduct = async () => {
    const res = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        description: description,
        imageUrls: imageUrls,
        price: price,
      }),
    });
    setIsNotificationShown(true);
  };

  const updateNotifcationState = () => {
    setIsNotificationShown(!isNotifcationShown);
  };

  const updateUsers = (newUsers: User[]) => setUsers(newUsers);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("/api/users");
      const json: { data: User[] } = await res.json();
      const dbUsers = json.data;
      setUsers(dbUsers);
    };
    getUsers();
  }, []);

  const updateImageUrls = (newImageUrls: string[]) =>
    setImageUrls(newImageUrls);
  return (
    <>
      <Notification
        title="Product added successfully!"
        description="Users can now see it on the product page."
        show={isNotifcationShown}
        setShow={updateNotifcationState}
      />
      <ImageSelectModal
        open={isImageSelectModalDisplayed}
        setOpen={(newValue: boolean) =>
          setIsImageSelectModalDisplayed(newValue)
        }
        imageUrls={imageUrls}
        updateImageUrls={updateImageUrls}
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
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6"
            >
              Price
            </label>
          </div>
          <div className="mt-2">
            <input
              id="price"
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsImageSelectModalDisplayed(true)}
              className="rounded-full mt-12 mb-12 bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Select Images
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {imageUrls.map((url) => (
              <img key={url} alt={url} src={url} />
            ))}
          </div>
          <button
            type="button"
            onClick={addProduct}
            className="rounded-full mt-12 bg-indigo-600 px-4 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Product
          </button>
        </div>
        <AdminUsersTable users={users} updateUsers={updateUsers} />
      </div>
    </>
  );
}
