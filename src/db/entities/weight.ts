import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("gas_scale", { schema: "public" })
export class gas_scale {
  @PrimaryColumn("varchar")
  id: string;
  @Column({ type: "int", array: true, default: [] })
  weight: number[];
  @Column({ type: "timestamp", array: true, default: [] })
  time: Date[];
}
