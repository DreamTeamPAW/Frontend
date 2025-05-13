import React, { useState } from "react";
import { BookmarkSimple } from "@phosphor-icons/react/dist/icons/BookmarkSimple"; 

type Status = string;
type StatusColors = Record<Status, string>;

interface StatusCardProps {
  currentStatus: Status;
  statusColors: StatusColors;
  statuses: Status[];
  onChange: (newStatus: Status) => void;
}

const StatusCard: React.FC<StatusCardProps> = ({
  currentStatus,
  statusColors,
  statuses,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<Status | null>(null);

  // Normalize for comparison
  const normalizedCurrentStatus = currentStatus.toLowerCase();

  return (
    <div
      className="absolute top-2 right-2 z-20"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setHovered(null);
      }}
      style={{ width: 32, height: 32 }}
    >
      {/* Overlapping icon and circle */}
      <div className="relative w-8 h-8">
        {/* Status color dot */}
        <div
          className="absolute inset-0 w-8 h-8 rounded-full shadow cursor-pointer"
          style={{
            backgroundColor: statusColors[currentStatus.toUpperCase()] || "#d1d5db",
            borderColor: statusColors[currentStatus.toUpperCase()] || "#d1d5db",
          }}
        />
        {/* Icon centered over the dot */}
        <BookmarkSimple
          size={24}
          className="absolute inset-0 m-auto text-white pointer-events-none"
        />
      </div>
      {/* Popover inside the card */}
      <div
        className={`absolute top-0 right-0 bg-white rounded shadow-lg border transition-all duration-200
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        style={{ zIndex: 30 }}
        onClick={e => e.stopPropagation()}
      >
        {statuses.map((status) => {
          const isActive = status.toLowerCase() === normalizedCurrentStatus;
          const isHovered = hovered === status;
          const showActive = isActive || isHovered;
          return (
            <button
              key={status}
              className="block bold w-full text-left px-2 py-1 text-sm last:mb-0 transition-colors duration-150 outline-none"
              style={
                showActive
                  ? {
                      backgroundColor: statusColors[status] || "#d1d5db",
                      color: "#fff",
                    }
                  : {
                      color: statusColors[status] || "#d1d5db",
                      backgroundColor: "transparent",
                    }
              }
              onMouseEnter={() => setHovered(status)}
              onMouseLeave={() => setHovered(null)}
              onMouseDown={e => e.preventDefault()}
              onClick={() => onChange(status)}
              type="button"
              tabIndex={0}
            >
              {status}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StatusCard;
