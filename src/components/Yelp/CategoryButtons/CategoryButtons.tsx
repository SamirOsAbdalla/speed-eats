
import "./CategoryButtons.css"


function CategoryButton({ category }: any) {
    return (
        <div key={category.alias} className={`yelp-category__button--dark d-flex justify-content-center align-items-center`}>
            <span>{category.title}</span>
        </div>
    )
}


interface Props {
    categories?: any[]
}

export default function CategoryButtons({
    categories
}: Props) {

    return (
        <>
            {categories && categories.length > 0 &&
                <div className="w-100 yelp-category__buttons d-flex justify-content-center align-items-center align-self-center gap-3">
                    {categories.slice(0, 3).map(category =>
                        <CategoryButton key={category.title} category={category} />
                    )}
                </div >
            }
        </>
    )
}
