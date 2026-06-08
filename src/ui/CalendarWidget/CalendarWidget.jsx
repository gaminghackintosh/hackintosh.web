import React, { useMemo, useCallback } from "react";

// Дни недели
const dayNamesShort = ["M", "T", "W", "T", "F", "S", "S"];
const monthNames = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

/**
 * CalendarWidget - виджет календаря для рабочего стола (macOS Big Sur+ style)
 */
export function CalendarWidget() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Дни месяца для сетки
  const daysInMonth = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const days = [];

    // Смещение для начала недели (понедельник = 0)
    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;

    // Дни предыдущего месяца
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(currentYear, currentMonth - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
      });
    }

    // Дни текущего месяца
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push({
        date: new Date(currentYear, currentMonth, day),
        isCurrentMonth: true,
      });
    }

    // Дни следующего месяца (заполняем до 42 ячеек)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(currentYear, currentMonth + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentYear, currentMonth]);

  // Проверка на "сегодня"
  const isToday = useCallback((date) => {
    if (!date) return false;
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }, [today]);

  return (
    <div className="calendar-widget">
      {/* ── Month Name ── */}
      <div className="calendar-widget-header">
        <span className="calendar-widget-month">
          {monthNames[currentMonth]}
        </span>
      </div>

      {/* ── Weekday Names ── */}
      <div className="calendar-widget-weekdays">
        {dayNamesShort.map((day, index) => (
          <div key={index} className="calendar-widget-weekday">
            {day}
          </div>
        ))}
      </div>

      {/* ── Calendar Grid ── */}
      <div className="calendar-widget-grid">
        {daysInMonth.map((item, index) => {
          const date = item.date;
          const isCurrentMonth = item.isCurrentMonth;
          const isTodayDate = isToday(date);

          return (
            <div
              key={index}
              className={`calendar-widget-day
                ${!isCurrentMonth ? 'other-month' : ''}
                ${isTodayDate ? 'today' : ''}
              `}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
