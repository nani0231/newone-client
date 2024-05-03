import React, { useState, useEffect } from "react";
import axios from "axios";
import apiList from "../liberary/apiList";

const Questionsdatas = () => {
  const [subject, setSubject] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [chapter, setChapter] = useState([]);

  useEffect(() => {
    const getSubject = async () => {
      const resSubject = await fetch(`${apiList.subjects}`);
      const resSubjectData = await resSubject.json();
      setSubject(await resSubjectData);
    };
    getSubject();
  }, []);

  console.log(subject,"all subjects")
  const handleSubject = (event) => {
    const getSubjectId = event.target.value;
    setSubjectId(getSubjectId);
  };

  useEffect(() => {
    const getChapter = async () => {
      const resChapter = await fetch(
        `${apiList.getChapters}/${subjectId}`
      );
      const resChapterData = await resChapter.json();
      setChapter(await resChapterData);
    };
    getChapter();
  }, [subjectId]);

  return (
    <>
      <div>
        <label>Subject</label>
        <select name="subject" onChange={(e) => handleSubject(e)}>
          {subject &&
            subject?.map((getSub, index) => (
              <option key={index} value={getSub._id}>
                {getSub.name}
              </option>
            ))}
        </select>
        <select name="Chapter">
          {chapter.map((getChapter, index) => (
            <option key={index} value={getChapter._id}>
              {getChapter.Name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Questionsdatas;
// {/* <div>
// {selectedChapters.map((selectedChapterId) => {
//   const selectedChapter = allsubjectsData.find(
//     (chapter) => chapter._id === selectedChapterId
//   );

//   if (selectedChapter) {
//     return (
//       <div key={selectedChapter._id}>
//         {selectedChapter.map((chapterData) => (
//           <div key={chapterData._id}>
//             {chapterData?.MCQ?.map((mcq, id) => (
//               <div key={id}>
//                 {/* Display MCQ questions */}
//                 <input
//                   type="checkbox"
//                   id={`mcq_${id}`}
//                   value={mcq._id}
//                   checked={questionList.includes(
//                     mcq.Question
//                   )}
//                   onChange={handleQuestionList}
//                 />
//                 <label htmlFor={`mcq_${id}`}>
//                   {mcq.Question}
//                 </label>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     );
//   }
//   return null;
// })}
// </div> */}