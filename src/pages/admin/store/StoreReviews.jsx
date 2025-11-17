import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquare, ThumbsUp, Flag, Reply } from "lucide-react";

const StoreReviews = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Dummy reviews data
  const reviews = [
    {
      id: 1,
      customer: "John Doe",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      review:
        "Amazing food! The chicken burger was delicious and the service was excellent. Will definitely order again!",
      date: "2024-01-15",
      orderId: "#ORD001",
      helpful: 12,
      response: null,
      status: "published",
    },
    {
      id: 2,
      customer: "Sarah Wilson",
      avatar: "/api/placeholder/40/40",
      rating: 4,
      review:
        "Great pizza! The crust was perfect and toppings were fresh. Only suggestion would be faster delivery.",
      date: "2024-01-14",
      orderId: "#ORD002",
      helpful: 8,
      response:
        "Thank you for your feedback! We're working on improving our delivery times.",
      status: "published",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      avatar: "/api/placeholder/40/40",
      rating: 3,
      review:
        "Food was okay but arrived cold. The paneer tikka could have been spicier.",
      date: "2024-01-13",
      orderId: "#ORD003",
      helpful: 5,
      response: null,
      status: "published",
    },
    {
      id: 4,
      customer: "Emma Davis",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      review:
        "Best burger in town! The extra cheese was perfect. Highly recommended!",
      date: "2024-01-12",
      orderId: "#ORD004",
      helpful: 15,
      response:
        "We're thrilled you enjoyed your meal! Thank you for the great review.",
      status: "published",
    },
    {
      id: 5,
      customer: "Alex Brown",
      avatar: "/api/placeholder/40/40",
      rating: 2,
      review:
        "Order was cancelled without notice. Very disappointed with the service.",
      date: "2024-01-11",
      orderId: "#ORD005",
      helpful: 3,
      response:
        "We're sorry for the inconvenience. Please contact us to resolve this issue.",
      status: "published",
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const positiveReviews = reviews.filter((r) => r.rating >= 4).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
          <p className="text-muted-foreground">
            View and manage customer reviews and ratings.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <div className="text-2xl font-bold">
                {averageRating.toFixed(1)}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{totalReviews}</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-green-600" />
              <div className="text-2xl font-bold">{positiveReviews}</div>
            </div>
            <p className="text-xs text-muted-foreground">Positive Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">
                {((positiveReviews / totalReviews) * 100).toFixed(0)}%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Satisfaction Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.avatar} alt={review.customer} />
                  <AvatarFallback>
                    {review.customer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{review.customer}</h4>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {review.date} • {review.orderId}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.review}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {review.helpful} helpful
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground"
                    >
                      <Flag className="h-3 w-3 mr-1" />
                      Report
                    </Button>
                  </div>

                  {/* Owner Response */}
                  {review.response && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Reply className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Your Response
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {review.response}
                      </p>
                    </div>
                  )}

                  {/* Reply Form */}
                  {!review.response && (
                    <div className="mt-4 space-y-2">
                      <Textarea
                        placeholder="Write a response to this review..."
                        value={selectedReview === review.id ? replyText : ""}
                        onChange={(e) => {
                          setSelectedReview(review.id);
                          setReplyText(e.target.value);
                        }}
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedReview(null);
                            setReplyText("");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button size="sm">Reply</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoreReviews;
