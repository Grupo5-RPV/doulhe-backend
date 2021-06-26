import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { AuctionItem } from '../entities'

@Entity('categories')
export default class Category {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @OneToMany(() => AuctionItem, auctionItem => auctionItem.category)
    auctionItems: AuctionItem[]
}
