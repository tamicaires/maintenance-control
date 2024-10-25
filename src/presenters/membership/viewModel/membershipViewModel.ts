export class MembershipViewModel {
  static toHttp(membership) {
    return {
      id: membership.id,
      userId: membership.userId,
      companyId: membership.companyId,
      role: membership.role,
      status: membership.status,
      createdAt: membership.createdAt,
      updatedAt: membership.updatedAt,
    };
  }
}