import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { User, UserRole } from "@prisma/client";
import Select from "../input/Select";
import Notification from "../Notification";
import { hash } from "bcryptjs";

const roleOptions = [
  { label: UserRole.USER, value: UserRole.USER },
  { label: UserRole.ADMIN, value: UserRole.ADMIN },
];

interface Props {
  open: boolean;
  setOpen: (newValue: boolean) => void;
  users: User[];
  updateUsers: (newUsers: User[]) => void;
}

export default function Example({ open, setOpen, users, updateUsers }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<{ label: string; value: string }>(
    roleOptions[0]
  );
  const [notificationMessage, setNotifcationMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const updateRole = (newRole: { label: string; value: string }) => {
    setRole(newRole);
  };

  const handleCreateUser = async () => {
    const encryptedPassword = await hash(password, 12);

    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: encryptedPassword,
        role: role.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: { message: string; error: string | undefined; user: User } =
      await response.json();

    if (data.error) {
      setIsError(true);
      setNotifcationMessage("Failed to create a user");
    } else {
      setIsError(false);
      setNotifcationMessage("Successfully created a new user: " + name);
      updateUsers([...users, data.user]);
    }
    setOpen(false);
  };
  console.log(isError);
  return (
    <>
      <Notification
        title={notificationMessage}
        variant={isError ? "error" : "success"}
        show={notificationMessage !== ""}
        setShow={(newState: boolean) => setNotifcationMessage("")}
      />
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <UserIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Add a new user
                      </Dialog.Title>
                      <div className="w-auto p-12">
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
                            required
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6"
                          >
                            Email
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6"
                          >
                            Password
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="mt-2">
                          <Select
                            options={roleOptions}
                            selected={role}
                            setSelected={updateRole}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleCreateUser}
                    >
                      Create User
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
