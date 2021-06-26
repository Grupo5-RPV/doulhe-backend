import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm'

import {
  AuctionItem,
  Participant
} from '../entities'

@Entity('auction_bids')
export default class AuctionBid {
  @PrimaryColumn()
  id: string

  @Column({ type: 'timestamp', name: 'timestamp' })
  timestamp: Date

  @Column({ type: 'decimal' })
  value: number

  @ManyToOne(() => Participant, participant => participant.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'participant_id' })
  participant: Participant

  @Column({ nullable: false })
  participantId: string

  @ManyToOne(() => AuctionItem, auctionItem => auctionItem.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'auction_item_id' })
  auctionItem: AuctionItem

  @Column({ nullable: false })
  auctionItemId: string
}
