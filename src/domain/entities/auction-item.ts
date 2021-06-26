import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'

import {
  Auction,
  AuctionBid,
  Category,
  ItemProvider
} from '../entities'

@Entity('auction_items')
export default class AuctionItem {
    @PrimaryColumn()
    id: string

    @Column({ length: 32 })
    title: string

    @Column({ length: 128 })
    description: string

    @Column({ type: 'decimal' })
    minimumBid: number

    @Column({ length: 255 })
    imagePath: string

    @Column({ type: 'smallint', default: 0 })
    finishedOff: number

    @Column({ type: 'smallint', default: 0 })
    sold: number

    @OneToMany(() => AuctionBid, auctionBid => auctionBid.auctionItem)
    auctionBids: AuctionBid[]

    @ManyToOne(() => Auction, auction => auction.id, { nullable: true })
    @JoinColumn({ name: 'auctionId' })
    auction: Auction

    @Column({ nullable: true })
    auctionId: string

    @ManyToOne(() => Category, category => category.id)
    @JoinColumn({ name: 'categoryId' })
    category: Category

    @Column()
    categoryId: string

    @ManyToOne(() => ItemProvider, itemProvider => itemProvider.id)
    @JoinColumn({ name: 'itemProviderId' })
    itemProvider: ItemProvider

    @Column({ nullable: true })
    itemProviderId: string
}
