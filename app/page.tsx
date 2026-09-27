import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen md:mx-40 p-5">
      <div className="md:grid grid-cols-2 items-center ">
        <div>
          <h1 className="text-4xl text-blue-500 font-bold">Miniso</h1>
          <h3 className="text-4xl text-blue-400 mt-3">
            Capture your ideas anytime
          </h3>
          <p className="text-justify mt-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus
            odio perferendis voluptatem aperiam harum. Neque, suscipit vel odit
            reiciendis nihil mollitia numquam hic voluptates, deserunt,
            provident iure? Non, dolor! Ipsam.
          </p>
          <div className="my-5">
            <Link
              href={"/login"}
              className="bg-blue-700 px-3 py-2 rounded text-white"
            >
              Lets Start
            </Link>
          </div>
        </div>
        <div className="relative w-full h-100">
          <img
            className="ml-10"
            src="https://cdn-icons-png.flaticon.com/512/2038/2038509.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
