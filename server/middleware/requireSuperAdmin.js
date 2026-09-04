// =====================================
// Super-admin authorization middleware
// =====================================
// Runs AFTER verifyToken (which sets req.admin from the verified JWT).
//
// Only allows an authenticated admin whose token carries
// role === "superadmin" to proceed. Normal admins (and requests with
// a missing/unknown role) are denied with a generic 403.
//
// The role is read from the verified token (req.admin.role), never from
// the request body, so a client-supplied role cannot escalate.
// =====================================

const requireSuperAdmin = (req, res, next) => {
  const role = req.admin && req.admin.role;

  if (role !== "superadmin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }

  next();
};

module.exports = requireSuperAdmin;
