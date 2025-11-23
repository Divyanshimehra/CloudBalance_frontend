import { BsFillSendArrowUpFill } from "react-icons/bs";
function AddUser() {
  return (
    <div>
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-xl font-semibold">Add New User</h2>
      </div>
      <div className="bg-white mt-4 rounded-md p-4">
        <form>
          {/* Row 1 */}
          <div className="flex gap-10 mb-4">
            <div className="mb-4 w-72">
              <label
                htmlFor="fName"
                className="block text-sm font-medium text-gray-700 mb-1 after:content-['*'] after:text-red-500 after:ml-1"
              >
                First Name
              </label>

              <input
                className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                type="text"
                id="fName"
                placeholder="Enter First Name"
              />
            </div>

            <div className="mb-4 w-72">
              <label
                htmlFor="lName"
                className="block text-sm font-medium text-gray-700 mb-1 after:content-['*'] after:text-red-500 after:ml-1"
              >
                Last Name
              </label>

              <input
                className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                type="text"
                id="lName"
                placeholder="Enter Last Name"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex gap-10 mb-4">
            <div className="mb-4 w-72">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1 after:content-['*'] after:text-red-500 after:ml-1"
              >
                Email
              </label>

              <input
                className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                type="email"
                id="email"
                placeholder="Enter Email"
              />
            </div>

            <div className="mb-4 w-72">
              <label
                htmlFor="sRole"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Role
              </label>

              <select
                id="sRole"
                className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="readonly">Read-Only</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </div>
        </form>
        <div className="flex ml-130">
          <button 
          className="flex gap-2 items-center bg-blue-500 hover:bg-blue-700 text-white text-base rounded-md p-2"
          title="Submit Details" 
          >
            <BsFillSendArrowUpFill size={20} />
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUser;