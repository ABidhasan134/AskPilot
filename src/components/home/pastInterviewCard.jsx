import cover from "@/../../public/covers/adobe.png";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";
import { VscStarEmpty } from "react-icons/vsc";
import {
  DialogHeader,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import StartInterview from "./startInterview";

const PastInterviewCard = ({ interview }) => {
  // console.log(interview)
  return (
    <div className="card-border w-[360px] max-sm:w-full">
      <div className="card-interview">
        <div className="border-2 absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg">
          <p>Mixed</p>
        </div>
        <Image src={cover} alt="company logo" width={90} height={90}></Image>
        <h2>{interview.role}</h2>
        <div className="flex justify-between">
          {/* date and marke */}
          <div className="flex items-center gap-2">
            <FaCalendarAlt></FaCalendarAlt>
            {interview.createdAt}
          </div>
          <div>
            <VscStarEmpty />
            <p>35/100</p>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ab
          optio saepe distinctio, cupiditate fugiat corrupti in tempora
          repellendus quaerat, libero numquam, quis aut quam itaque! Nostrum
          expedita aliquam maxime?
        </p>
        {/* technology and btn */}
        <div className="flex justify-between p-2">
          <div>
            <Image
              src={interview.techImage}
              alt="technology Image"
              width={30}
              height={30}
              className="rounded-full"
            ></Image>
          </div>
          <button className="btn-primary">
            {/* <Link href={
              interview.feedback?`/interview/${interview._id}/feedback`:`/interview/${interview.id}`
            }>
            {interview.feedback?'Check feedback':'view interview'} */}

            {/* </Link> */}
            {interview.feedback ? (
              <Link href={`/interview/${interview.id}`} alt="/home">
                FeedBack
              </Link>
            ) : (
              <Dialog className="absolute">
                <DialogTrigger asChild>
                  <span>View Interview</span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{interview.role} Interview</DialogTitle>
                    <DialogDescription>
                      Are you sure 
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <StartInterview type='start Interview'interview={interview}></StartInterview>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <span className="btn-primary flex items-center">
                        Close
                      </span>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PastInterviewCard;
