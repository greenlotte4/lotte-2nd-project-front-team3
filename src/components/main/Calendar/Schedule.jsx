import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Plus,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/AuthStore";
import { getCalendar, getUser, insertSchedule } from "../../../api/calendarAPI";

export default function Schedule() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user); // Zustand에서 사용자 정보 가져오기
  const department = user?.department;
  const uid = user?.uid;
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
    calendarId: "",
    uid: uid,
    internalAttendees: [],
    newExternalAttendee: "",
    externalAttendees: [],
    location: "",
    content: "",
  });

  const [isAttendeesDropdownOpen, setIsAttendeesDropdownOpen] = useState(false);

  const [availableAttendees, setAvailableAttendees] = useState([]);
  const [option, setOption] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser(department);
      const data2 = await getCalendar(uid);
      console.log("55555565666666" + data);
      setAvailableAttendees(data);
      setOption(data2);
    };
    console.log("444444444" + availableAttendees);
    fetchData();
  }, [department]);
  const [selectedAttendees, setSelectedAttendees] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 외부 참석자 추가
    if (name === "newExternalAttendee") {
      setFormData({
        ...formData,
        newExternalAttendee: value, // 외부 참석자 이름만 처리
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // 다른 필드는 일반적으로 처리
      });
    }
  };

  const handleAddExternalAttendee = () => {
    if (formData.newExternalAttendee) {
      setFormData({
        ...formData,
        externalAttendees: [
          ...formData.externalAttendees,
          formData.newExternalAttendee,
        ],
        newExternalAttendee: "", // 추가 후 입력란 초기화
      });
    }
  };

  const toggleAttendeesDropdown = () => {
    setIsAttendeesDropdownOpen(!isAttendeesDropdownOpen);
  };

  const handleSelectAttendee = (attendee) => {
    if (!selectedAttendees.includes(attendee)) {
      // 새로운 참석자 추가
      const updatedAttendees = [...selectedAttendees, attendee];
      setSelectedAttendees(updatedAttendees);

      // formData 업데이트
      setFormData((prevFormData) => ({
        ...prevFormData,
        internalAttendees: updatedAttendees, // 최신 상태의 참석자를 저장
      }));
    }

    console.log("selected : ", [...selectedAttendees, attendee]);
    toggleAttendeesDropdown();
  };

  // 내부 참석자 삭제 함수
  const removeInternalAttendee = (attendeeToRemove) => {
    setSelectedAttendees(
      selectedAttendees.filter((attendee) => attendee !== attendeeToRemove)
    );
  };

  // 외부 참석자 삭제 함수
  const removeExternalAttendee = (attendeeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      externalAttendees: prev.externalAttendees.filter(
        (attendee) => attendee !== attendeeToRemove
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // 폼 제출 시 데이터 로그
    const fetchData = async () => {
      await insertSchedule(formData);
    };
    fetchData();
    navigate("/antwork/calendar");
  };

  return (
    <section className="w-full max-w-[1200px] h-auto rounded-lg p-[25px] bg-white mx-auto">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-[25px] font-semibold mb-[10px]">일정 등록</h1>
          <p className="text-sm text-gray-500">상세등록</p>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-8  ">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}
            <div>
              <label className="flex items-center text-m font-semibold text-gray-700 mb-2">
                <Calendar className="mr-2 text-blue-500" size={18} />
                일정 이름
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                placeholder="일정 제목을 입력하세요"
                required
              />
            </div>

            {/* Start and End Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-m font-semibold text-gray-700 mb-2">
                  <Clock className="mr-2 text-green-500" size={18} />
                  시작 시간
                </label>
                <input
                  type="datetime-local"
                  name="start"
                  value={formData.start}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                  required
                />
              </div>
              <div>
                <label className="flex items-center text-m font-semibold text-gray-700 mb-2">
                  <Clock className="mr-2 text-red-500" size={18} />
                  종료 시간
                </label>
                <input
                  type="datetime-local"
                  name="end"
                  value={formData.end}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
                  required
                />
              </div>
            </div>

            {/* Calendar Selection */}
            <div>
              <label className="flex items-center text-m font-semibold text-gray-700 mb-2">
                <Calendar className="mr-2 text-purple-500" size={18} />
                Calendar 선택
              </label>
              <select
                name="calendarId"
                value={formData.calendarId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                required
              >
                <option value="">Calendar 선택</option>
                {option.map((item) => (
                  <option key={item.calendarId} value={item.calendarId}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 내부 참석자 섹션 (드롭다운 토글 방식) */}
            <div>
              <label className="flex items-center text-m font-semibold text-gray-700 mb-2">
                <Users className="mr-2 text-indigo-500" size={18} />
                참석자 명단
              </label>

              {/* 드롭다운 헤더 */}
              <div
                onClick={toggleAttendeesDropdown}
                className="flex justify-between items-center w-full px-4 py-2 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-all"
              >
                <span>부서원 선택</span>
                {isAttendeesDropdownOpen ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>

              {/* 드롭다운 내용 */}
              {isAttendeesDropdownOpen && (
                <div className="mt-2 border-2 border-gray-200 rounded-lg">
                  <ul className="max-h-48 overflow-y-auto">
                    {availableAttendees.map((attendee, idx) => (
                      <li key={idx}>
                        <button
                          type="button"
                          onClick={() => handleSelectAttendee(attendee)}
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-all"
                        >
                          {attendee}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedAttendees.length > 0 && (
                <div className="mt-2 space-y-1">
                  <h4 className="text-m font-medium text-gray-600">
                    선택된 참석자
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAttendees.map((attendee, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-s flex items-center"
                      >
                        {attendee}
                        <button
                          type="button"
                          onClick={() => removeInternalAttendee(attendee)}
                          className="ml-1 text-blue-500 hover:text-blue-700"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 외부 참석자 섹션 (삭제 버튼 추가) */}
            <div>
              <label className="flex items-center text-m font-semibold text-gray-700 mb-2">
                <Users className="mr-2 text-teal-500" size={18} />
                외부 참석자 명단
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="newExternalAttendee"
                  value={formData.newExternalAttendee}
                  onChange={handleInputChange}
                  placeholder="외부 참석자 이메일 또는 이름"
                  className="flex-grow px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                />
                <button
                  type="button"
                  onClick={handleAddExternalAttendee}
                  className="bg-[#b2d1ff] text-white p-2 rounded-lg hover:bg-teal-600 transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>

              {formData.externalAttendees.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex flex-wrap gap-2">
                    {formData.externalAttendees.map((attendee, idx) => (
                      <span
                        key={idx}
                        className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-s flex items-center"
                      >
                        {attendee}
                        <button
                          type="button"
                          onClick={() => removeExternalAttendee(attendee)}
                          className="ml-1 text-teal-500 hover:text-teal-700"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center text-m font-semibold text-gray-700 mb-2">
                <MapPin className="mr-2 text-orange-500" size={18} />
                장소
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="장소를 입력하세요"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center text-m font-semibold text-gray-700 mb-2">
                일정 내용
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="일정에 대한 자세한 내용을 입력하세요"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                rows="4"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex w-[200px] mx-auto justify-between">
              <button
                type="submit"
                className="bg-[#b2d1ff] text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-green-600 transition-all transform hover:-translate-y-1 shadow-lg"
              >
                일정 등록
              </button>
              <Link
                to="/antwork/calendar"
                className="bg-[#eceef1] text-black px-8 py-3 rounded-full hover:from-blue-600 hover:to-green-600 transition-all transform hover:-translate-y-1 shadow-lg"
              >
                취소
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
