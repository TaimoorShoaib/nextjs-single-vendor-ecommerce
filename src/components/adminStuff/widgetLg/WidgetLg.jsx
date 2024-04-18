"use client"


import style from "./widgetLg.module.css";

export default function WidgetLg() {
    const Button = ({ type }) => {
        return <button className={`${style.widgetLgButton} ${style[type]}`}>{type}</button>;
      };
  return (
    <div className={style.widgetLg}>
      <h3 className={style.widgetLgTitle}>Latest transactions</h3>
      <table className={style.widgetLgTable}>
        <tr className={style.widgetLgTr}>
          <th className={style.widgetLgTh}>Customer</th>
          <th className={style.widgetLgTh}>Date</th>
          <th className={style.widgetLgTh}>Amount</th>
          <th className={style.widgetLgTh}>Status</th>
        </tr>
        <tr className={style.widgetLgTr}>
          <td className={style.widgetLgUser}>
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className={style.widgetLgImg}
            />
            <span className={style.widgetLgName}>Susan Carol</span>
          </td>
          <td className={style.widgetLgDate}>2 Jun 2021</td>
          <td className={style.widgetLgAmount}>$122.00</td>
          <td className={style.widgetLgStatus}>
            <Button type="Approved" />
          </td>
        </tr>
        <tr className={style.widgetLgTr}>
          <td className={style.widgetLgUser}>
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className={style.widgetLgImg}
            />
            <span className={style.widgetLgName}>Susan Carol</span>
          </td>
          <td className={style.widgetLgDate}>2 Jun 2021</td>
          <td className={style.widgetLgAmount}>$122.00</td>
          <td className={style.widgetLgStatus}>
            <Button type="Declined" />
          </td>
        </tr>
        <tr className={style.widgetLgTr}>
          <td className={style.widgetLgUser}>
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className={style.widgetLgImg}
            />
            <span className={style.widgetLgName}>Susan Carol</span>
          </td>
          <td className={style.widgetLgDate}>2 Jun 2021</td>
          <td className={style.widgetLgAmount}>$122.00</td>
          <td className={style.widgetLgStatus}>
            <Button type="Pending" />
          </td>
        </tr>
        <tr className={style.widgetLgTr}>
          <td className={style.widgetLgUser}>
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className={style.widgetLgImg}
            />
            <span className={style.widgetLgName}>Susan Carol</span>
          </td>
          <td className={style.widgetLgDate}>2 Jun 2021</td>
          <td className={style.widgetLgAmount}>$122.00</td>
          <td className={style.widgetLgStatus}>
            <Button type="Approved" />
          </td>
        </tr>
      </table>
    </div>
  );
}