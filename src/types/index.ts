export interface BaseEntity {
  /**
   * 主键ID
   */
  id?: number | string
  /**
   * 是否可用(0-可用,1-不可用)
   */
  available?: boolean
  /**
   * 逻辑删除(0-未删除,1-已删除)
   */
  isDeleted?: boolean
  /**
   * 创建时间
   */
  gmtCreate?: Date
  /**
   * 修改时间
   */
  gmtUpdate?: Date
}
