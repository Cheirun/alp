import React, { useState } from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; import { Progress } from "@/components/ui/progress"; import { Badge } from "@/components/ui/badge";

const activitiesData = [ { id: 1, title: "Math Matching Game", type: "game", level: "Beginner", status: "completed", progress: 100, }, { id: 2, title: "Science Quiz", type: "quiz", level: "Intermediate", status: "inProgress", progress: 60, }, { id: 3, title: "English Flashcards", type: "flashcards", level: "Beginner", status: "notStarted", progress: 0, }, { id: 4, title: "Animated Learning Video", type: "video", level: "Beginner", status: "completed", progress: 100, }, ];

const ActivityCard = ({ activity }) => { return ( <Card className="w-full md:w-72 shadow-lg rounded-2xl p-4"> <CardContent className="space-y-3"> <div className="text-xl font-semibold">{activity.title}</div> <div className="text-sm text-gray-500 capitalize">Type: {activity.type}</div> <div className="text-sm text-gray-500">Level: {activity.level}</div> <Progress value={activity.progress} className="h-2" /> {activity.status === "completed" ? ( <Badge className="bg-green-500">Completed</Badge> ) : ( <Button className="w-full" variant="outline"> {activity.status === "inProgress" ? "Resume" : "Start"} </Button> )} </CardContent> </Card> ); };

const ActivitiesTab = () => { const [filter, setFilter] = useState("all");

const filteredActivities = filter === "all" ? activitiesData : activitiesData.filter((a) => a.type === filter);

return ( <div className="p-6"> <h2 className="text-2xl font-bold mb-4">Your Activities</h2> <Tabs defaultValue="all" onValueChange={setFilter}> <TabsList className="mb-4"> <TabsTrigger value="all">All</TabsTrigger> <TabsTrigger value="quiz">Quizzes</TabsTrigger> <TabsTrigger value="game">Games</TabsTrigger> <TabsTrigger value="video">Videos</TabsTrigger> <TabsTrigger value="flashcards">Flashcards</TabsTrigger> </TabsList> <TabsContent value={filter}> <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> {filteredActivities.map((activity) => ( <ActivityCard key={activity.id} activity={activity} /> ))} </div> </TabsContent> </Tabs> </div> ); };

export default ActivitiesTab;