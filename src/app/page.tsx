import Link from 'next/link';
import styles from "./page.module.css";

export default function Home() {
  const plans = [
    { id: 1, name: '基本方案', price: 'HK$50/月' },
    { id: 2, name: '進階方案', price: 'HK$100/月' },
    { id: 3, name: '專業方案', price: 'HK$200/月' },
  ];
  
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {plans.map(plan => (
        <div key={plan.id} className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
          <p className="text-gray-600 mb-4">{plan.price}</p>
          <Link href={`/plans/${plan.id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">了解更多</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
