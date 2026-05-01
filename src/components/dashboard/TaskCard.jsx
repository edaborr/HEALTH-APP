export default function TaskCard({ task }) {
  return (
    <div className="p-4 rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-lg transition flex justify-between items-center">

      <div className="flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: task.color || "#6FA9B7" }}
        />

        <div>
          <p className="text-sm font-medium">{task.title}</p>
          <p className="text-xs text-gray-400">
            {task.date} {task.time && `• ${task.time}`}
          </p>
        </div>
      </div>

    </div>
  );
}