// GET API to get application status notifications for students
jobRouter.get("/api/applications/notifications", auth, async (req, res) => {
  try {
    const studentId = req.user._id;

    // Validation - Only students can access their notifications
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can access application notifications.",
      });
    }

    // Find all applications for this student that have been reviewed (accepted/rejected)
    const applications = await Application.find({
      candidateId: studentId,
      status: { $in: ["accepted", "rejected"] },
    })
      .populate("jobId", "title companyId")
      .populate("companyId", "companyName industry profilePicture")
      .sort({ updatedAt: -1 }); // Sort by most recent first

    // Format the notifications
    const notifications = applications.map((app) => {
      let message = "";
      let type = "";

      if (app.status === "accepted") {
        message = `Congratulations! Your application for "${app.jobId.title}" has been accepted by ${app.companyId.companyName}.`;
        type = "success";
      } else if (app.status === "rejected") {
        message = `Your application for "${app.jobId.title}" at ${app.companyId.companyName} has been reviewed but not selected for this position.`;
        type = "info";
      }

      return {
        _id: app._id,
        message,
        type,
        status: app.status,
        jobTitle: app.jobId.title,
        companyName: app.companyId.companyName,
        companyIndustry: app.companyId.industry,
        companyLogo: app.companyId.profilePicture,
        applicationDate: app.createdAt,
        reviewedDate: app.updatedAt,
        isNew: app.updatedAt > new Date(Date.now() - 24 * 60 * 60 * 1000), // New if reviewed in last 24 hours
      };
    });

    // Get counts for different notification types
    const notificationStats = {
      total: notifications.length,
      accepted: notifications.filter((n) => n.status === "accepted").length,
      rejected: notifications.filter((n) => n.status === "rejected").length,
      new: notifications.filter((n) => n.isNew).length,
    };

    res.status(200).json({
      success: true,
      message: "Notifications retrieved successfully",
      notifications,
      stats: notificationStats,
      count: notifications.length,
    });
  } catch (error) {
    console.error("Notifications error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching notifications.",
    });
  }
});
