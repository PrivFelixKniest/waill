"""add update and creation time columns

Revision ID: a66933f7d42a
Revises: 9e0551baa986
Create Date: 2023-12-19 23:31:59.086422

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a66933f7d42a'
down_revision: Union[str, None] = '9e0551baa986'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('created_at', sa.DateTime(), nullable=False))
    op.add_column('user', sa.Column('updated_at', sa.DateTime(), nullable=False))
    op.add_column('well', sa.Column('user_id', sa.Integer(), nullable=False))
    op.add_column('well', sa.Column('created_at', sa.DateTime(), nullable=False))
    op.add_column('well', sa.Column('updated_at', sa.DateTime(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('well', 'updated_at')
    op.drop_column('well', 'created_at')
    op.drop_column('well', 'user_id')
    op.drop_column('user', 'updated_at')
    op.drop_column('user', 'created_at')
    # ### end Alembic commands ###
