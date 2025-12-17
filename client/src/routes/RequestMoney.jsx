import RequestMoneyCard from "../components/RequestMoney/RequestMoneyCard";

export default function RequestMoneyPage() {
  return (
    <main
      id="main-content"
      role="main"
      aria-labelledby="request-heading"
      className="flex-grow pt-28 px-4 text-center"
    >
      <h1 id="request-heading" className="sr-only">
        Request Money
      </h1>
      <RequestMoneyCard />
    </main>
  );
}