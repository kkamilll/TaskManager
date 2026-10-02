import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AvatarGroup from "../../components/AvatarGroup";
import moment from "moment";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

const ViewTaskDetails = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    // Funkcja zwracająca kolor statusu
    const getStatusTagColor = (status) => {
        switch (status) {
            case "In Progress":
                return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
            case "Completed":
                return "text-lime-500 bg-lime-50 border border-lime-500/20";
            default:
                return "text-violet-500 bg-violet-50 border border-violet-500/10";
        }
    };

    // Pobranie danych taska
    const getTaskDetailsById = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));
            if (response.data) setTask(response.data);
        } catch (error) {
            console.error("Error fetching task details:", error);
        }
    };

    // Aktualizacja checkboxa w todoChecklist
const updateTodoChecklist = async (index) => {
    if (!task?.todoChecklist?.[index]) return;

    // Tworzymy nową tablicę, aby React wykrył zmianę
    const newTodoChecklist = task.todoChecklist.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
    );

    setTask({ ...task, todoChecklist: newTodoChecklist });

    try {
        const response = await axiosInstance.put(
            API_PATHS.TASKS.UPDATE_TASK_CHECKLIST(task._id || task.id),
            { todoChecklist: newTodoChecklist }
        );
        if (response.status === 200) {
            setTask(response.data?.task || { ...task, todoChecklist: newTodoChecklist });
        }
    } catch (error) {
        console.error("Error updating checklist", error);
        // Cofamy zmianę jeśli błąd
        setTask(task);
    }
};


    useEffect(() => {
        if (id) getTaskDetailsById();
    }, [id]);

    return (
        <DashboardLayout activeMenu="My Tasks">
            <div className="mt-5">
                {task && (
                    <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
                        <div className="form-card col-span-3">
                            {/* Tytuł i status */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm md:text-xl font-medium">{task.title}</h2>
                                <div
                                    className={`text-[11px] md:text-[13px] font-medium ${getStatusTagColor(
                                        task.status
                                    )} px-4 py-0.5 rounded`}
                                >
                                    {task.status}
                                </div>
                            </div>

                            {/* Opis */}
                            <div className="mt-4">
                                <InfoBox label="Description" value={task.description} />
                            </div>

                            {/* Start i Due Date */}
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <InfoBox
                                    label="Start Date"
                                    value={task.createdAt ? moment(task.createdAt).format("Do MMM YYYY") : "N/A"}
                                />
                                <InfoBox
                                    label="Due Date"
                                    value={task.dueDate ? moment(task.dueDate).format("Do MMM YYYY") : "N/A"}
                                />
                            </div>

                            {/* Priority i Assigned */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <InfoBox label="Priority" value={task.priority} />
                                <div>
                                    <label className="text-xs font-medium text-slate-500">Assigned To</label>
                                    <AvatarGroup
                                        avatars={task.assignedTo?.map((item) => item.profileImageUrl) || []}
                                        maxVisible={5}
                                    />
                                </div>
                            </div>

                            {/* Todo Checklist */}
                            <div className="mt-2">
                                <label className="text-xs font-medium text-slate-500">Todo Checklist</label>
                                {task?.todoChecklist?.map((item, index) => (
                                    <TodoChecklist
                                        key={`todo_${index}`}
                                        text={item.text}
                                        isChecked={item.completed}
                                        onChange={() => updateTodoChecklist(index)}
                                    />
                                ))}
                            </div>

                            {/* Attachments */}
                            {task?.attachments?.length > 0 && (
                                <div className="mt-2">
                                    <label className="text-xs font-medium text-slate-500">Attachments</label>
                                    {task.attachments.map((link, index) => (
                                        <Attachment
                                            key={index}
                                            link={link}
                                            index={index}
                                            onClick={() =>
                                                window.open(link.startsWith("http") ? link : "https://" + link, "_blank")
                                            }
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default ViewTaskDetails;

// ------------------ KOMONENTY POMOCNICZE ------------------

const InfoBox = ({ label, value }) => (
    <div className="flex flex-col">
        <label className="text-xs font-medium text-slate-500">{label}</label>
        <p className="text-[12px] md:text-[13px] font-medium text-gray-700 mt-0.5">{value}</p>
    </div>
);

const TodoChecklist = ({ text, isChecked, onChange }) => (
    <div className="flex items-center gap-3 p-3">
        <input
            type="checkbox"
            checked={isChecked}
            onChange={onChange}
            style={{ accentColor: "var(--color-primary)" }}
            className="w-4 h-4 bg-gray-100 border-gray-300 rounded-sm outline-none cursor-pointer"
        />
        <p className="text-[13px] text-gray-800">{text}</p>
    </div>
);

const Attachment = ({ link, index, onClick }) => (
    <div
        className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2 cursor-pointer"
        onClick={onClick}
    >
        <div className="flex-1 flex items-center gap-3">
            <span className="text-xs text-gray-400 font-semibold mr-2">
                {index < 9 ? `0${index + 1}` : index + 1}
            </span>
            <p className="text-xs text-black break-all">{link}</p>
        </div>
        <LuSquareArrowOutUpRight className="text-gray-400" />
    </div>
);
