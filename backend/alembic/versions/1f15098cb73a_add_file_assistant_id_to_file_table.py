"""Add file assistant id to file table

Revision ID: 1f15098cb73a
Revises: 9e83167170c5
Create Date: 2023-12-30 01:53:11.042210

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1f15098cb73a'
down_revision: Union[str, None] = '9e83167170c5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('file', sa.Column('file_assistant_id', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('file', 'file_assistant_id')
    # ### end Alembic commands ###
