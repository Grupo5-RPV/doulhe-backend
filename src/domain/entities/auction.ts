import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, Generated } from 'typeorm'
import { Auctioneer, AuctionItem } from '../entities'

@Entity('Auctions')
export default class Auction {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string

    @Column({ type: 'timestamp' })
    start: string

    @Column({ type: 'timestamp', nullable: true })
    end: string

    @Column({ type: 'smallint', default: 0 })
    closed: number

    @OneToMany(() => AuctionItem, auctionItem => auctionItem.auction)
    auctionItems: AuctionItem[]

    @ManyToOne(() => Auctioneer, auctioneer => auctioneer.id)
    @JoinColumn({ name: 'auctioneerId' })
    auctioneer: Auctioneer

    @Column()
    auctioneerId: string
}
