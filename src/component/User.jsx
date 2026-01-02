import { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-xl">
        Loading users...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        Users List
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user) => (
          <div
            key={user.id}
            className="
              bg-white 
              rounded-2xl 
              p-6 
              shadow-md 
              transition-all 
              duration-300 
              hover:shadow-2xl 
              hover:-translate-y-2
            "
          >
            <h2 className="text-xl font-semibold mb-3 transition hover:text-pink-500">
              {user.name.firstname} {user.name.lastname}
            </h2>

            <p className="text-gray-600 flex items-center gap-2 mb-1 transition hover:text-black">
              📧 {user.email}
            </p>

            <p className="text-gray-600 flex items-center gap-2 mb-1 transition hover:text-black">
              👤 Username: {user.username}
            </p>

            <p className="text-gray-600 flex items-center gap-2 mb-1 transition hover:text-black">
              📍 {user.address.city}, {user.address.street}
            </p>

            <p className="text-gray-600 flex items-center gap-2 transition hover:text-black">
              📞 {user.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
