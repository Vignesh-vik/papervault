import Component from "@/logo-particles";

export default function Page() {
  return (
    <>
      <Component/>
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center dark:bg-black">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl">
          Welcome to PaperVault
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
          Your go-to platform for previous year question papers.
        </p>
      </div>
      
    </>
  );
}
